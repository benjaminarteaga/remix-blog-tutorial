import { Link, Outlet, useLoaderData } from "remix";
import { getPosts } from "~/post"
import type { Post } from "~/post";
import adminStyles from "~/styles/admin.css";

export const links = () => {
  return [{ rel: "stylesheet", href: adminStyles }]
}

export const loader = async () => {
  return getPosts();
}

export default function Admin() {
  const posts = useLoaderData<Post[]>();
  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`edit/${post.slug}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
        <h4>
          <a href="/posts">Back to posts</a>
        </h4>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}