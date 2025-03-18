"use client"

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import App from "./App"
import { ThemeProvider } from "./contexts/ThemeContext"
import { ToastProvider } from "./components/common/Toast"
import { AuthProvider } from "./contexts/AuthContext"
import { ApiProvider } from "./contexts/ApiContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ApiProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </ApiProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

