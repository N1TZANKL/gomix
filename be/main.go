package main

import (
	"fmt"
	"net/http"
)

func main() {
    http.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
			switch r.Method {
			case "GET":
        fmt.Fprintf(w, "Hello from Go Backend! 👋")
			case "POST":
				fmt.Fprintf(w, "Received your request 🙏")
			default:
				fmt.Fprintf(w, "Sorry, only GET and POST methods are supported. 🥲")
			}
    })

    fmt.Println("Server is running on http://localhost:8080")
    http.ListenAndServe(":8080", nil)
}
