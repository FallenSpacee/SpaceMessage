// next
import Image from 'next/image';
// icons
import pugIcon from 'public/images/pugIcon.png';
// components
import AuthForm from './components/AuthForm';

import {Press_Start_2P} from 'next/font/google';

const inter = Press_Start_2P({weight: '400', style: 'normal', subsets: ['latin']});

export default function Home() {
  return (
    <div
      className="
    max-sm:px-5
		flex min-h-full 
		flex-col 
		justify-center 
		py-10
		sm:px-6 
		lg:px-8"
      style={{backgroundImage: `url(/images/SpaceBackground.png)`}}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md  ">
        <div className="w-[190px] h-12 mx-auto">
          <Image alt="Logo" src={pugIcon} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[Orchid]">Sign in to your account</h2>
      </div>
      <AuthForm />
    </div>
  );
}
