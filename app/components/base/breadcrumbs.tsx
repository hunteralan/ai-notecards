import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "./link";
import clsx from "clsx";

type Props = {
  pages: Breadcrumb[];
  className?: string;
};

export function Breadcrumbs({ pages, className }: Props) {
  return (
    <nav aria-label="Breadcrumb" className={clsx("flex", className)}>
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <FontAwesomeIcon
                icon={faHome}
                aria-hidden="true"
                className="size-5 shrink-0"
              />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faChevronRight}
                aria-hidden="true"
                className="size-5 shrink-0 text-gray-400"
              />
              <Link
                href={page.current ? "" : page.href}
                aria-current={page.current ? "page" : undefined}
                className={clsx(
                  "ml-4 text-sm font-medium",
                  page.current
                    ? "text-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
