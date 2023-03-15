export function Pen(props) {
  return (
    <svg
      aria-hidden="true"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="h-6 w-6 fill-current text-grey transition-colors duration-300 group-hover:text-dark group-focus:text-dark dark:group-hover:text-light dark:group-focus:text-light inline-flex relative -top-1 mx-0.5"
    >
      <path
        fillRule="evenodd"
        d="M11 20a1 1 0 011-1h9a1 1 0 110 2h-9a1 1 0 01-1-1zM18 3.879c-.297 0-.583.118-.793.328L4.903 16.512l-.529 2.114 2.115-.529L18.793 5.793A1.123 1.123 0 0018 3.88zm-2.207-1.086a3.121 3.121 0 114.414 4.414l-12.5 12.5a1 1 0 01-.464.263l-4 1a1 1 0 01-1.213-1.212l1-4a1 1 0 01.263-.465l12.5-12.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
