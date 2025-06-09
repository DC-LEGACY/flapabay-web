import { blogs } from "@/data/blogs";
import { Link } from "react-router-dom";

interface BlogDate {
  month: string;
  day: string;
}

interface Blog {
  id: number;
  image: string;
  date: BlogDate;
  tag: string;
  title: string;
}

const Blog: React.FC = () => {
  return (
    <>
      {blogs.map((blog: Blog) => (
        <div className="col-sm-6 col-lg-4" key={blog.id}>
          <div className="blog-style1">
            <div className="blog-img">
              <img
                className="w-100 h-100 cover"
                src={blog.image}
                alt={`Blog post: ${blog.title}`}
              />
            </div>
            <div className="blog-content">
              <div className="date">
                <span className="month">{blog.date.month}</span>
                <span className="day">{blog.date.day}</span>
              </div>
              <a className="tag" href="#">
                {blog.tag}
              </a>
              <h6 className="title mt-1">
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </h6>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog; 