export function TrashBin(props) {
  return (
    <svg
      aria-hidden="true"
      {...props}
      className="h-6 w-6 fill-current text-grey transition-colors duration-300 group-hover:text-dark group-focus:text-dark dark:group-hover:text-light dark:group-focus:text-light inline-flex relative -top-1"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M2 6a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1z"
        clipRule="evenodd"
      ></path>
      <path
        fillRule="evenodd"
        d="M10 3a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1h-4zm7 2V4a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H5a1 1 0 00-1 1v14a3 3 0 003 3h10a3 3 0 003-3V6a1 1 0 00-1-1h-2zM6 7v13a1 1 0 001 1h10a1 1 0 001-1V7H6z"
        clipRule="evenodd"
      ></path>
      <path
        fillRule="evenodd"
        d="M10 10a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1zM14 10a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
