import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import type { ReactNode } from "react";
import { Divider } from "../base/divider";

type Props = {
  tabs: { name: string; children: ReactNode }[];
  headerRight?: ReactNode;
};

export function Tabs({ tabs, headerRight }: Props) {
  return (
    <TabGroup>
      <div className="flex justify-between">
        <div className="flex items-center">
          <TabList className="flex gap-4">
            {tabs.map((t) => (
              <Tab
                key={t.name}
                className={
                  "rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                }
              >
                {t.name}
              </Tab>
            ))}
          </TabList>
        </div>
        {headerRight}
      </div>
      <Divider className="my-4" />
      <TabPanels>
        {tabs.map((t) => (
          <TabPanel key={t.name}>{t.children}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
