# API Endpoints

>Deployed Url: https://wijiwaste-cc-1020536480314.asia-southeast2.run.app

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(main endpoint)</code></summary>

##### Parameters
> None

##### Request Body
> None


##### Response Body

```json
{
"status": "success", 
"message": "WijiWaste API is running..."
}
```
</details>


#### Predictions

<details>
 <summary><code>POST</code> <code><b>/register</b></code> <code>(Register)</code></summary>


##### Request Body
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

##### Response Body
```json
{
    "message": "string",
    "userId": "string"
}
```
</details>

<details>
 <summary><code>POST</code> <code><b>/login</b></code> <code>(Login)</code></summary>


##### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

##### Response Body
```json
{
    "message": "string",
    "user": {
        "id": "string",
        "name": "string",
        "email": "string",
        "password": "string",
        "address": "string",
        "photoUrl": "string",
        "points": number
    }
}
```
</details>








