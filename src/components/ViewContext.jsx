import React, {
    createContext,
    useEffect,
    useContext,
    useState,
    useCallback,
  } from 'react'
  import { useInView } from 'react-intersection-observer'
  
  // Create context
  export const ViewContext = createContext()
  
//   // Provider component
//   export function ViewProvider({ children }) {
//     const [viewState, setViewState] = useState({})
  
//     const updateViewState = useCallback((id, inView) => {
//       setViewState((prev) => ({ ...prev, [id]: inView }))
//     }, [])
  
//     return (
//       <ViewContext.Provider value={{ viewState, updateViewState }}>
//         {children}
//       </ViewContext.Provider>
//     )
//   }

export function ViewProvider({ children }) {
    const [viewState, setViewState] = useState(() => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('viewState')
        return stored ? JSON.parse(stored) : {}
      }
      return {}
    })
  
    const updateViewState = useCallback((id, inView) => {
      setViewState((prev) => {
        const updated = { ...prev, [id]: inView }
        if (typeof window !== 'undefined') {
          localStorage.setItem('viewState', JSON.stringify(updated))
        }
        return updated
      })
    }, [])

    const clearViewState = () => {
        localStorage.removeItem('viewState')
        setViewState({})
      }
  
    return (
      <ViewContext.Provider value={{ viewState, updateViewState, clearViewState }}>
        {children}
      </ViewContext.Provider>
    )
      
  }
  
  
  // Custom hook to use ViewContext
  export function useViewChild(id) {
    const { viewState, updateViewState } = useContext(ViewContext)
    const { ref, inView } = useInView({
      threshold: [0],
      triggerOnce: true,
      rootMargin: '100px',
      root: null,
      delay: 500,
    })
  
    useEffect(() => {
      if (inView) {
        updateViewState(id, true)
      }
    }, [id, inView, updateViewState])
  
    return { ref, inView, isVisible: viewState[id] || false }
  }
  
  
  // Example component using the hook
  export function ViewChild({ id, children, animateStyle, index, loading }) {
    const { ref, isVisible } = useViewChild(id)
  
    const dynamicStyle = {
      // zIndex: -999,
        opacity: isVisible ? '1' : '0',
        height: 'max-content',
      transform: isVisible ? 'translateY(0px)' : 'translateY(200px)',
      transition: `opacity ${0.1 * index}s ease, transform ${1}s ease`,
      ...animateStyle, // Allow overriding or extending styles
    }
  
    return (
      <div ref={ref} style={dynamicStyle} className='h-100'>
        {console.log(`Component ${id} is in view: ${isVisible}`)}
        {children}
      </div>
    )
  }
  