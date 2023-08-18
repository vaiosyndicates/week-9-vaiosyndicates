<h1 align="left">Holla Amigos !</h1>

Holla!

API stands for Application Programming Interface. With API, we can allow two or more applications to talk to each other. APIs are an accessible way to extract and share data within and across organizations. APIs are all around us. Every time you use a rideshare app, using mobile banking, or even playing game, you're using an API
## REST API INGREDIENTS
For implementing REST API, i build simple REST Api using

- Express
- Typescript
- Express Validator
- Dotenv
- Body parser

## REST API ROUTE
There several routing in this REST Api such as :

```js
Method : GET
/api/expense
```
This endpoint will return all of expenses

---

```js
Method: POST
/api/expense/add

```
#### Input
Field  | Data | Desc
--- | --- | ---
id_user| string | Mandatory
type|0 or 1 represent  ( Cash in or Cash Out ) | Mandatory
name| string | Mandatory
details| string | Mandatory
jumlah| integer | Mandatory

This endpoint used for post data and save it to array / database

---
```js
Method: PUT
/api/expense/edit/{id}
```

#### Parameter
Field  | Data | Desc
--- | --- | ---
id| string  | Mandatory

#### Input
Field  | Data | Desc
--- | --- | ---
id_user| string | Mandatory
type|0 or 1 represent  ( Cash in or Cash Out ) | Mandatory
name| string | Mandatory
details| string | Mandatory
jumlah| integer | Mandatory

This endpoint used for update data based on their ID

---


```js
Method: DELETE
/api/expense/delete/{id}
```
#### Parameter
Field  | Data | Desc
--- | --- | ---
id| string  | Mandatory

This endpoint used for delete data based on their ID



  </li>
</ol>

Deployment success and you can use this url for Postman testing:
<ul>
<li>

[week-9-vaiosyndicates-production.up.railway.app](week-9-vaiosyndicates-production.up.railway.app)
</li>
</ul>



## Reach Me Out

[![Linkedin Badge](https://img.shields.io/badge/-Ade_Kresna_D-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/ade-kresna-dewantara/)
[![Gmail Badge](https://img.shields.io/badge/-kresnafti2013@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white)](mailto:kresnafti2013@gmail.com)
