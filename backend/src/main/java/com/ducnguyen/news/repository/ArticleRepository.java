package com.ducnguyen.news.repository;

import com.ducnguyen.news.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends PagingAndSortingRepository<Article, Long> {
    @Query("From Article a WHERE a.title LIKE %:searchText% OR a.author LIKE %:searchText% OR a.category " +
            "LIKE %:searchText%" +
            " " +
            "OR" +
            " " +
            "a" +
            ".content LIKE %:searchText% ORDER BY a.author DESC")
    Page<Article> findAllCustomized(Pageable pageable, @Param("searchText") String searchText);
}
