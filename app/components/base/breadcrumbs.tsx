import {
  faChevronLeft,
  faChevronRight,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "./link";
import clsx from "clsx";
import { Divider } from "./divider";

type Props = {
  pages: Breadcrumb[];
  className?: string;
};

export function Breadcrumbs({ pages, className }: Props) {
  const canShowBackButton = pages.length - 2 >= 0;
  const lastPage: Breadcrumb = canShowBackButton
    ? pages[pages.length - 2]
    : { current: false, href: "/", name: "Home" };

  return (
    <div className="mb-4">
      <div className="min-md:hidden">
        <Link
          href={lastPage.current ? "" : lastPage.href}
          aria-current={lastPage.current ? "page" : undefined}
          className={clsx(
            "text-sm font-medium flex items-center gap-4",
            lastPage.current
              ? "text-blue-500"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          {lastPage.name}
        </Link>
        <Divider className="mt-4" />
      </div>
      <nav
        aria-label="Breadcrumb"
        className={clsx("flex max-md:hidden", className)}
      >
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
    </div>
  );
}
