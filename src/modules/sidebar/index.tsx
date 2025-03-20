import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';

export function Sidebar() {
  return (
    <Accordion type="single" collapsible className="w-48 p-8">
      <AccordionItem value="item-1">
        <AccordionTrigger>基础</AccordionTrigger>
        <AccordionContent>
          <Button className="w-full justify-start" variant="ghost">执行机制</Button>
          <Button className="w-full justify-start" variant="ghost">垃圾回收机制</Button>
          <Button className="w-full justify-start" variant="ghost">执行上下文</Button>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>原理</AccordionTrigger>
        <AccordionContent>
          <Button className="w-full justify-start" variant="ghost">执行机制</Button>
          <Button className="w-full justify-start" variant="ghost">垃圾回收机制</Button>
          <Button className="w-full justify-start" variant="ghost">执行上下文</Button>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>实践</AccordionTrigger>
        <AccordionContent>
          <Button className="w-full justify-start" variant="ghost">类型检测</Button>
          <Button className="w-full justify-start" variant="ghost">数组去重</Button>
          <Button className="w-full justify-start" variant="ghost">数组排序</Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
