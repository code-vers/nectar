enum CourseCategory {
  MAINTENANCE_TECH = 'maintenance_tech',
  PM = 'pm',
  VENDOR = 'vendor',
  INVESTOR = 'investor',
}

enum Level {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

enum CourseStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

enum ContentType {
  VIDEO = 'video',
  LIVE = 'live',
  AUDIO = 'audio',

  ARTICLE = 'article',
  PDF = 'pdf',
  SLIDE = 'slide',

  QUIZ = 'quiz',
  ASSIGNMENT = 'assignment',
  EXERCISE = 'exercise',

  LINK = 'link',
  EMBED = 'embed',
}

enum CourseContentStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}
export {
  ContentType,
  CourseCategory,
  CourseContentStatus,
  CourseStatus,
  Level,
};
