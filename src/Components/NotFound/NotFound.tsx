

export default function NotFound() {
  
  return (
    <div className="h-screen flex items-center justify-center">
    <div className="flex-container-2 w-full h-full flex items-center justify-center text-white">
      <div className="text-center">
        <h2 className="text-8xl font-bold mb-4 space-x-2">
          <span className="fade-in inline-block" id="digit1">4</span>
          <span className="fade-in inline-block" id="digit2">0</span>
          <span className="fade-in inline-block" id="digit3">4</span>
        </h2>
        <h3 className="fade-in text-2xl mb-6">PAGE NOT FOUND</h3>
        <button
          type="button"
          className="border border-white px-6 py-2 text-white uppercase font-semibold hover:bg-white hover:text-gray-700 transition"
        >
          Return To Home
        </button>
      </div>
    </div>
  </div>
  
  )
}
