# API

## GET (authenticate)
http://localhost:8080/api/v1/users/authenticate

## Requests
{
    "email": "admin@news.com",
    "password": "test"
}

## GET
http://localhost:8080/api/v1/articles
## GET by ID
http://localhost:8080/api/v1/articles/100

## POST
http://localhost:8080/api/v1/articles

## PUT
http://localhost:8080/api/v1/articles/100

## DELETE by ID
http://localhost:8080/api/v1/articles/100

## Request
{
"title": "COVID-19: B.C. begins mass vaccination rollout on Monday",
"author": "Matt Robinson",
"coverPhotoURL": "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1eAslo.img?h=842&w=1123&m=6&q=60&o=f&l=f",
"content": "Content"
}