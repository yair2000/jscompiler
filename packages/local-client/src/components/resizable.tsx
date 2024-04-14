import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./styles/resizable.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) =>{
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.5); // Default width

  useEffect(() =>{
    const handleResize = () =>{
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);
      if(direction === "horizontal"){
        const newWidth = Math.min(Math.max(width, innerWidth * 0.2), innerWidth * 0.7);
        setWidth(newWidth);
      }
    };
    handleResize(); // Manually trigger resize event when component mounts
  
    window.addEventListener('resize', handleResize);
    return () =>{
      window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, width]);
  
  // Track viewport size changes
  useEffect(() =>{
    const handleViewportChange = () =>{
      // Force a re-render when viewport size changes
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleViewportChange);
    return () =>{
      window.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  let resizableProps: ResizableBoxProps;

  if(direction === "horizontal"){
    resizableProps ={
      className: "resize-horizontal",
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.7, Infinity], // Adjust maximum width as needed
      height: Infinity,
      width
    }
  }
  else{
    resizableProps ={
      className: "resize-vertical react-resizable-handle-s",
      minConstraints: [Infinity, innerHeight * 0.2],
      maxConstraints: [Infinity, innerHeight * 0.6],
      height: 300,
      width: window.innerWidth * 0.93,
      resizeHandles: ["s"]
    }
  }

  return(
    <ResizableBox {...resizableProps}>
      {children}
    </ResizableBox>
  )
}

export default Resizable;