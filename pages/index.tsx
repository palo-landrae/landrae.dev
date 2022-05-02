import type { NextPage } from 'next';
import { Layout } from '@/components/layout';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { BioYear, BioSection } from '@/components/Bio';
import Subscribe from '@/components/Subscribe';

const Socials = dynamic(() =>
  import('@/components/Icons').then((mod) => mod.Socials)
);

const Home: NextPage = () => {
  return (
    <Layout title="Home" description="Landrae's personal website portfolio">
      {/* Introduction-start */}
      <div className="p-6">
        <h1 className="text-5xl">Hi🐼,</h1>
        <p className="text-base md:text-lg">
          Welcome to my portfolio
          <br />
          I&#39;m a student developer based in Milan, Italy
          <br />
          At the moment I&#39;m interested in ReactJS and minimal design.
          <br />
          Feel free to explore my portfolio & tell me what you think about it!
        </p>
        <div className="my-3">
          <Socials />
        </div>
      </div>
      {/* Introduction-end */}

      {/* About-start */}
      <div className="px-6 my-3">
        <h1 className="text-3xl">About</h1>
        <div className="flex flex-col md:flex-row align-center justify-center md:justify-between">
          <div className="max-w-md">
            <p className="text-base md:text-lg">
              My name is Loui Andrae Palo. I&#39;m a Senior High School student
              currently learning about Information Technology/Computer Science.
              <br />
              The intended purpose of this website is to share what I&#39;ve
              learned so far.
            </p>
          </div>
          <div className="w-32 h-32 rounded-md self-center overflow-hidden relative mx-auto md:mx-0 mt-5 md:mt-0">
            <Image
              alt="Blog post image"
              src="/images/profile.jpg"
              width={128}
              height={128}
            />
          </div>
        </div>
      </div>
      {/* About-end */}

      {/* Bio-start */}
      <div className="px-6 my-3">
        <div className="flex flex-col md:flex-row align-center justify-center md:justify-between">
          <div className="max-w-lg md:text-lg">
            <h1 className="text-3xl">Bio</h1>
            <BioSection>
              <BioYear>2022</BioYear>
              <span>
                Diploma in Information Technology at Istituto di Istruzione
                Superiore Luigi Galvani, Milan
              </span>
            </BioSection>
            <BioSection>
              <BioYear>2021</BioYear>Corso Forma.Temp in Ricerca Attiva Lavoro,
              Randstad Spa
            </BioSection>
            <BioSection>
              <BioYear>2002</BioYear>
              Born in Talisay, Philippines
            </BioSection>
          </div>
        </div>
      </div>
      {/* Bio-end */}

      {/* Newsletter-start */}
      <Subscribe />
      {/* Newsletter-end */}
    </Layout>
  );
};

export default Home;
