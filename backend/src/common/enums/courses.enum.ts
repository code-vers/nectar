enum CourseCategory {
  MAINTENANCE_TECH = 'maintenance_tech',
  PM = 'pm',
  VENDOR = 'vendor',
  INVESTOR = 'investor',
}

enum Level {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

enum CourseStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  ARCHIVED = 'Archived',
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
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  ARCHIVED = 'Archived',
}
export {
  ContentType,
  CourseCategory,
  CourseContentStatus,
  CourseStatus,
  Level,
};
