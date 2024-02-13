export class Article {
  constructor(
    id,
    author,
    title,
    subtitle,
    type,
    genre,
    slug,
    thumbnail,
    titleImage,
    uploadDate,
  ) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.subtitle = subtitle;
    this.type = type;
    this.genre = genre;
    this.slug = slug;
    this.thumbnail = thumbnail;
    this.titleImage = titleImage;
    this.uploadDate = uploadDate;
  }
}

export class Genre {
  constructor(id, className, slug, description) {
    this.id = id;
    this.className = className;
    this.slug = slug;
    this.description = description;
  }
}
