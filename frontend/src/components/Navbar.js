import { Link } from "react-router-dom";

export default function Navbar(){
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Tarun's Workout</h1>
        </Link>
      </div>
    </header>
  );
};
