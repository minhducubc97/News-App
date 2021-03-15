package com.ducnguyen.news.domain;

public class Article {
    private Long id;
    private String title;
    private String author;
    private String coverPhotoURL;
    private String content;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCoverPhotoURL() {
        return coverPhotoURL;
    }

    public void setCoverPhotoURL(String coverPhotoURL) {
        this.coverPhotoURL = coverPhotoURL;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
