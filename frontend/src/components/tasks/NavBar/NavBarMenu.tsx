import type { NavBarItems } from "../../../types";

interface Props {
  ActivePage: string;
  NavBarRoutes: NavBarItems[];
  setActivePage: (value: string) => void;
}

export default function NavBarMenu({
  NavBarRoutes,
  ActivePage,
  setActivePage,
}: Props) {
  return (
    <div className="flex w-full overflow-x-auto text-white ">
      {NavBarRoutes.map((item) => (
        <span
          onClick={() => setActivePage(item.label)}
          key={item.label}
          className={`${
            item.label === ActivePage && "text-white border-b-2 text-[20px]"
          }  cursor-pointer whitespace-nowrap px-[10px] py-[8px] text-[#b9babb] font-[400] hover:text-[20px] hover:text-white hover:border-b-2 transition-all border-[#5473C1]`}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}
