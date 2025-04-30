import { useNavigate, Outlet } from "react-router-dom";
export const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("-----");
    return navigate("/");
  };
  return (
    <>
      <div className="component">Contact - +91 6205914390 - Mozammil Raza</div>
      <Outlet />
      <button onClick={handleSubmit}>Submit Form</button>
    </>
  );
};
