import Link from 'next/link';

export default function Heaader(){
return(<div className='w-full absolute text-white z-10'>
       <nav className='container relative flex flex-wrap items-cenetr justify-between mx-auto p-8'> 
        <Link className='font-bold text-3xl' href="/">Home</Link>
        <div className='space-x-4 text-xl'>

        <Link href="/performance">Savings</Link>
      <Link href="/scale">Withdraw</Link>
      <Link href="/reliability">Archives</Link>
        </div>
      </nav>
        </div>);
}
