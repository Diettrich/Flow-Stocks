export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      <h1 className="text-2xl font-bold mt-4">Chargement...</h1>
    </div>
  );
}
