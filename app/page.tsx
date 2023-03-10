import Image from 'next/image';
import { get } from '@vercel/edge-config';
import { redirect } from 'next/navigation';
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram, FaMastodon } from 'react-icons/fa'

export const dynamic = 'force-dynamic',
  runtime = 'edge';


function LinkCard({title, href, image}: { title: string; href: string; image?: string }) {
  return (
    <a href={href} className='flex items-center p-1 w-full rounded-md shadow-sm hover:scale-105 bg-white transition-all border border-indigo-500 mb-3 text-black max-w-3xl'>
      <div className="flex text-center w-full">
        <div className='w-10 h-10'>
          {image && (
          <Image 
            className='rounded-sm'
            alt={title}
            src={image}
            width={40}
            height={40}
          />
          )}
        </div>
        <h2 className="flex justify-center items-center font-semibold text-lg w-full -ml-10">{title}</h2>
      </div>
    </a>
  )
}

interface Data {
  name: string;
  avatar: string;
  links: Link[];
  socials: Social[]
  }

interface Link {
  title: string;
  href: string;
  image?: string; 
}

interface Social {
  title: string;
  href: string;
}

export default async function HomePage() {
  const data: Data | undefined  = await get('studiolinks');

  if (!data) {
    redirect ('https://joshillichmann.com')
  }

  return (
    <div className="flex flex-col items-center mx-auto w-full justify-center mt-16 px-8 text-white">
      <Image 
        className='rounded-full'
        alt={data.name}
        src={data.avatar}
        width={120}
        height={120}
      />
      <h1 className="font-bold mt-4 mb-8 text-xl">{data.name}</h1>
      {data.links.map((link) => (
        <LinkCard key={link.href} {...link} />
      ))}
      <div className='flex items-center gap-4 mt-8'>
        {data.socials.map((social) => (
          <a
            aria-label={`${social.title} link`}
            key={social.href}
            href={social.href}
            target='_blank'
            rel='noopener noreferrer'
          >
            {social.href.includes('twitter') ? (
              <FaTwitter className='w-8 h-8' />
            ) : social.href.includes('instagram') ? (
              <FaInstagram className='w-8 h-8' />
            ) : social.href.includes('linkedin') ? (
              <FaLinkedin className='w-8 h-8' />
            ) : social.href.includes('github') ? (
              <FaGithub className='w-8 h-8' />
            ) : social.href.includes('subculture') ? (
              <FaMastodon className='w-8 h-8' />
            ) : null}
          </a>
        ))}
      </div>
    </div>
  )
}

