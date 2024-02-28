

export default function Home() {

  return (
    <main className="flex flex-col justify-center items-center h-full bg-center text-white bg-[url('../assets/icons/LandPageBG.svg')] " >
      <h1 className="font-bold text-7xl mb-8">Welcome to Beacon</h1>
      <button className="flex flex-row border-2 p-2 gap-x-2" >Log In with Google <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" /> </button >
    </main >
  );
}