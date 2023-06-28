import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export function ThemeToggle() {
  return (
    <label className="swap swap-rotate">
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" className="theme-controller" value="light" />
      <SunIcon className="swap-on fill-current w-10 h-10" />
      <MoonIcon className="swap-off fill-current w-10 h-10" />
    </label>
  )
}
