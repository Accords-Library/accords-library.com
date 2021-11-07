import styles from 'styles/Panels/ReturnButton.module.css'
import Link from 'next/link'

type ReturnButtonProps = {
  url: string,
  title: string
}

export default function ReturnButton(pageProps: ReturnButtonProps) {
  return (
    <Link href={pageProps.url} passHref>
        <button>
            ❮&emsp;Return to {pageProps.title}
        </button>
    </Link>
  )
}