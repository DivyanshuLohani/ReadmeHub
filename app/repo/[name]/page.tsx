import RepoPage from './components/repo_page'
import { Metadata } from "next"

// Dynamic
export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ name: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params
  return {
    metadataBase: new URL('https://readmehub.divyanshulohani.xyz'),
    title: `${name} | ReadmeHub`,
    description: `Contribute to ${name} on ReadmeHub`,
    twitter: {
      card: 'summary_large_image',
      title: `${name} | ReadmeHub`,
      description: `Contribute to ${name} on ReadmeHub`,
      images: [`/api/repos/${name}/og`],
      creator: '@divyanshulohani',
    },
    openGraph: {
      images: [`/api/repos/${name}/og`],
    },
  }
}


export default function RepoServerPage() {
  return (
    <RepoPage />
  )
}
