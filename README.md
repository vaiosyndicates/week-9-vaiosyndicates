<h1 align="left">Holla Amigos !</h1>

Holla!

API stands for Application Programming Interface. With API, we can allow two or more applications to talk to each other. APIs are an accessible way to extract and share data within and across organizations. APIs are all around us. Every time you use a rideshare app, using mobile banking, or even playing game, you're using an API

## API ARCHITECTURE


There are several types of API based on their architecture style :
<ol>
  <li> <b>REST</b>

  REST is the most popular API architecture for transferring data over the internet. In a RESTful context, resources are accessible via endpoints, and operations are performed on those resources with standard HTTP methods such as GET, POST, PUT, and DELETE.
  </li>
  <li> <b>SOAP</b>

 SOAP, which stands for Simple Object Access Protocol, uses XML to transfer highly structured messages between a client and server. SOAP is often used in enterprise environments or legacy systems, and while it includes advanced security features, it can be slower than other API architectures.
  </li>
  <li> <b>GraphQL</b>

GraphQL is an open source query language that enables clients to interact with a single API endpoint to retrieve the exact data they need, without chaining multiple requests together. This approach reduces the number of round trips between the client and server, which can be useful for applications that may run on slow or unreliable network connections.
  </li>
  <li> <b>Webhooks</b>

Webhooks are used to implement event-driven architectures, in which requests are automatically sent in response to event-based triggers. For instance, when a specific event occurs in an application, such as a payment being made, the application can send an HTTP request to a pre-configured webhook URL with the relevant event data in the request payload. The system that receives the webhook can then process the event and take the appropriate action.
  </li>
  <li> <b>gRPC</b>

RPC stands for Remote Procedure Call, and gRPC APIs were originated by Google. In gRPC architectures, a client can call on a server as if it were a local object, which makes it easier for distributed applications and systems to communicate with one another.
  </li>
</ol>

## HOW API's WORKS

APIs work by sharing data between applications, systems, and devices. In order to better understand this process, it can be useful to think of APIs like restaurants. In this metaphor, the customer is like the user, who tells the waiter what she wants. The waiter is like an API, receiving the customer's order and translating it into easy-to-follow instructions for the kitchen—sometimes using specific codes or abbreviations that the kitchen staff will recognize. The kitchen staff is like the API server because it creates the order according to the customer's specifications and gives it to the waiter, who then delivers it to the customer.

<img src="https://i.ibb.co/2k52vSM/api-analogy.jpg" alt="api-analogy" border="0">


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


## Deployment



## Reach Me Out

[![Linkedin Badge](https://img.shields.io/badge/-Ade_Kresna_D-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/ade-kresna-dewantara/)
[![Gmail Badge](https://img.shields.io/badge/-kresnafti2013@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white)](mailto:kresnafti2013@gmail.com)