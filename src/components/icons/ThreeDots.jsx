export function ThreeDots(props) {
  return (
    <svg
      aria-hidden="true"
      {...props}
      class="h-6 w-6 fill-current text-grey transition-colors duration-300 group-hover:text-dark group-focus:text-dark dark:group-hover:text-light dark:group-focus:text-light inline-flex relative -top-1"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill-rule="evenodd"
        d="M10 12a2 2 0 114 0 2 2 0 01-4 0z"
        clip-rule="evenodd"
      ></path>
      <path
        fill-rule="evenodd"
        d="M10 5a2 2 0 114 0 2 2 0 01-4 0z"
        clip-rule="evenodd"
      ></path>
      <path
        fill-rule="evenodd"
        d="M10 19a2 2 0 114 0 2 2 0 01-4 0z"
        clip-rule="evenodd"
      ></path>
    </svg>
  )
}
