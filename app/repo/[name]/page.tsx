import RepoPage from './components/repo_page'
import { Metadata } from "next"

type Props = {
  params: Promise<{ name: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params
  return {
    title: `${name} | ReadmeHub`,
    description: `Contribute to ${name} on ReadmeHub`,
    openGraph: {
      images: [`/api/repo/${name}/og`],
    },
  }
}


export default function RepoServerPage() {
  return (
    <RepoPage />
  )
}
