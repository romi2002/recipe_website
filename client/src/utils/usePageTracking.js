import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import ReactGA from 'react-ga'

export const usePageTracking = () => {
  const location = useLocation()
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search)
  }, [location])
}
