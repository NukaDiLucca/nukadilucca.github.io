import { GetStaticProps } from 'next/types'
import meta from '../../_content/meta.json'
import resume from '../../_content/resume.json'
import Projects from '../components/Projects'
import Repositories from '../components/Repositories'
import Project from '../interfaces/project'
import Repo from '../interfaces/repo'
import Page from '../layouts/Page'
import { getAllProjects } from '../lib/content'
import { getGithubRepos } from '../lib/github'

type Props = {
  projects: Project[]
  repos: Repo[]
}

export default function IndexPage({ projects, repos }: Props) {
  const pageMeta = {
    title: `${resume.basics.name.toLowerCase()} { ${resume.basics.label.toLowerCase()} }`,
    description: meta.description,
    image: meta.img
  }

  return (
    <Page {...pageMeta}>
      <Projects projects={projects} />
      <Repositories repos={repos} />
    </Page>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getAllProjects(['title', 'images', 'slug'])
  const repos = await getGithubRepos()
  return { props: { projects, repos } }
}
