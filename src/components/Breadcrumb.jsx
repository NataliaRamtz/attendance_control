import { Link, useLocation } from "react-router-dom"
import { Breadcrumb } from "react-bootstrap"
//import { Home } from "lucide-react"

export function Breadcrumbs() {
    const location = useLocation();
  
    const pathname = location.pathname;
    const pathSegments = pathname.split("/").filter((segment) => segment);
  
    const routeNameMap = {
      admin: "Administrador",
      teacher: "Docente",
      teachers: "Docentes",
      dashboard: "Panel",
      groups: "Grupos",
      reports: "Reportes",
      profile: "Perfil",
      students: "Alumnos",
    };
  
    const getRouteName = (route) => {
      return routeNameMap[route] || route.charAt(0).toUpperCase() + route.slice(1);
    };
  
    const getRouteURL = (index) => {
      return "/" + pathSegments.slice(0, index + 1).join("/");
    };
  
    return (
      <Breadcrumb className="py-2">
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const isAdminOrTeacher = segment === "admin" || segment === "teacher";
  
          return isLast || isAdminOrTeacher ? (
            <Breadcrumb.Item active key={segment}>
              {getRouteName(segment)}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={segment} linkAs={Link} linkProps={{ to: getRouteURL(index) }}>
              {getRouteName(segment)}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    );
  }
  
