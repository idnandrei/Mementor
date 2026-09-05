-- Seed data for the videos and collection_videos tables.
--
-- Run this file in pgAdmin's Query Tool after users and collections have been
-- seeded. It creates videos for every user who owns at least one of the sample
-- collections listed below. The script is idempotent: it can be run repeatedly.

BEGIN;

-- Remove only records created by this seed, including older versions of it.
-- collection_videos rows are removed automatically through ON DELETE CASCADE.
DELETE FROM videos WHERE object_key LIKE 'demo/%';

WITH sample_videos(
    seed_key,
    collection_name,
    title,
    original_filename,
    content_type,
    size_bytes,
    status,
    created_at,
    uploaded_at
) AS (
    VALUES
        ('linear-algebra', 'Machine Learning', 'Introduction to Linear Algebra',
         'introduction-to-linear-algebra.mp4', 'video/mp4', 493879296::bigint,
         'pending_upload'::video_status, TIMESTAMPTZ '2026-07-27 09:15:00+00', NULL::timestamptz),
        ('attention-is-all-you-need', 'Deep Learning', 'Attention Is All You Need',
         'attention-is-all-you-need.mp4', 'video/mp4', 754974720::bigint,
         'pending_upload'::video_status, TIMESTAMPTZ '2026-07-24 13:30:00+00', NULL::timestamptz),
        ('gradient-descent', 'Machine Learning', 'Gradient Descent & Optimization',
         'gradient-descent-and-optimization.mp4', 'video/mp4', 880803840::bigint,
         'pending_upload'::video_status, TIMESTAMPTZ '2026-07-14 15:10:00+00', NULL::timestamptz),
        ('backpropagation', 'Deep Learning', 'Neural Networks: Backpropagation',
         'neural-networks-backpropagation.mp4', 'video/mp4', 608174080::bigint,
         'pending_upload'::video_status, TIMESTAMPTZ '2026-07-09 10:00:00+00', NULL::timestamptz)
),
resolved AS (
    SELECT
        c.owner_id,
        c.id AS collection_id,
        sv.*,
        (
            substr(md5(c.owner_id::text || ':mementor-demo:' || sv.seed_key), 1, 8) || '-' ||
            substr(md5(c.owner_id::text || ':mementor-demo:' || sv.seed_key), 9, 4) || '-' ||
            substr(md5(c.owner_id::text || ':mementor-demo:' || sv.seed_key), 13, 4) || '-' ||
            substr(md5(c.owner_id::text || ':mementor-demo:' || sv.seed_key), 17, 4) || '-' ||
            substr(md5(c.owner_id::text || ':mementor-demo:' || sv.seed_key), 21, 12)
        )::uuid AS video_id
    FROM sample_videos sv
    JOIN collections c ON lower(c.name) = lower(sv.collection_name)
),
upserted_videos AS (
    INSERT INTO videos (
        id,
        owner_id,
        title,
        original_filename,
        object_key,
        content_type,
        size_bytes,
        status,
        created_at,
        updated_at,
        uploaded_at
    )
    SELECT
        video_id,
        owner_id,
        title,
        original_filename,
        'demo/' || owner_id::text || '/' || video_id::text || '/' || original_filename,
        content_type,
        size_bytes,
        status,
        created_at,
        created_at,
        uploaded_at
    FROM resolved
    ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        original_filename = EXCLUDED.original_filename,
        object_key = EXCLUDED.object_key,
        content_type = EXCLUDED.content_type,
        size_bytes = EXCLUDED.size_bytes,
        status = EXCLUDED.status,
        updated_at = EXCLUDED.updated_at,
        uploaded_at = EXCLUDED.uploaded_at
    RETURNING id
)
INSERT INTO collection_videos (collection_id, video_id, added_at)
SELECT collection_id, video_id, created_at
FROM resolved
ON CONFLICT (collection_id, video_id) DO UPDATE SET
    added_at = EXCLUDED.added_at;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM collections
        WHERE lower(name) IN ('machine learning', 'deep learning', 'statistics')
    ) THEN
        RAISE EXCEPTION
            'No sample collections found. Seed Machine Learning, Deep Learning, and Statistics first.';
    END IF;
END
$$;

COMMIT;

-- Optional verification:
SELECT
    u.email AS owner_email,
    c.name AS collection_name,
    v.title,
    v.status,
    v.created_at
FROM collection_videos cv
JOIN collections c ON c.id = cv.collection_id
JOIN videos v ON v.id = cv.video_id
JOIN users u ON u.id = v.owner_id
WHERE v.object_key LIKE 'demo/%'
ORDER BY u.email, c.name, v.created_at DESC;
