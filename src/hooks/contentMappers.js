// The admin panel stores content in Supabase with its own column names
// (e.g. image_url, photo_url). These mappers translate each row into the
// exact shape the existing display components already use, so
// CourseCard, ArtFormCard, etc. never need to know where the data came
// from.

export const mapCourse = (row) => ({
  id: row.id,
  title: row.title,
  category: row.category,
  description: row.description,
  image: row.image_url,
  learningMode: row.learning_mode || [],
});

export const mapArtForm = (row) => ({
  id: row.id,
  name: row.name,
  description: row.description,
  image: row.image_url,
});

export const mapStudentWork = (row) => ({
  id: row.id,
  title: row.title,
  category: row.category,
  image: row.image_url,
});

export const mapAward = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description,
  image: row.image_url,
});

export const mapTestimonial = (row) => ({
  id: row.id,
  name: row.name,
  role: row.role,
  feedback: row.feedback,
  rating: row.rating || 5,
  photo: row.photo_url,
});

export const mapVideo = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description,
  thumbnail: row.thumbnail_url,
  youtubeUrl: row.youtube_url,
});
