"use client"
import { Form, Row, Col } from "react-bootstrap"
import { Search } from "lucide-react"

/**
 * Componente reutilizable para filtros de búsqueda
 */
export function SearchFilter({ searchTerm, onSearchChange, placeholder = "Buscar...", filters = [], className = "" }) {
  return (
    <Row className={className}>
      <Col md={6} lg={4} className="mb-3">
        <Form.Group>
          <Form.Label>Buscar</Form.Label>
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <div className="position-absolute top-50 end-0 translate-middle-y pe-3">
              <Search size={18} className="text-muted" />
            </div>
          </div>
        </Form.Group>
      </Col>

      {filters.map((filter, index) => (
        <Col key={index} md={6} lg={filter.size || 3} className="mb-3">
          <Form.Group>
            <Form.Label>{filter.label}</Form.Label>
            {filter.type === "select" ? (
              <Form.Select value={filter.value} onChange={(e) => filter.onChange(e.target.value)}>
                {filter.options.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            ) : filter.type === "date" ? (
              <Form.Control type="date" value={filter.value} onChange={(e) => filter.onChange(e.target.value)} />
            ) : (
              <Form.Control
                type={filter.type || "text"}
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                placeholder={filter.placeholder}
              />
            )}
          </Form.Group>
        </Col>
      ))}
    </Row>
  )
}

