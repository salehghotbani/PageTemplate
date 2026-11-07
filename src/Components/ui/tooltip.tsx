import { Portal, Tooltip as ChakraTooltip } from '@chakra-ui/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface TooltipProps extends Omit<
  ChakraTooltip.RootProps,
  'open' | 'defaultOpen' | 'onOpenChange'
> {
  content: ReactNode;
}

export function Tooltip({
  children,
  content,
  openDelay = 1000,
  ...props
}: TooltipProps) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const close = () => {
    clearTimeout(timer.current);
    timer.current = undefined;
    setOpen(false);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <ChakraTooltip.Root
      {...props}
      open={open && !props.disabled}
      disabled={props.disabled || !open}
      openDelay={openDelay}
      closeDelay={0}
      onOpenChange={(details) => {
        if (!details.open) close();
      }}
    >
      <ChakraTooltip.Trigger
        asChild
        onPointerEnter={(event) => {
          if (event.pointerType !== 'mouse' || props.disabled) return;
          close();
          // Ark skips its delay while another tooltip is open. Keep the same
          // dwell time for every button, with Ark still owning popup behavior.
          timer.current = setTimeout(() => {
            timer.current = undefined;
            setOpen(true);
          }, openDelay);
        }}
        onPointerLeave={close}
        onPointerDown={close}
        onFocus={(event) => {
          if (!props.disabled && event.target.matches(':focus-visible')) {
            clearTimeout(timer.current);
            timer.current = undefined;
            setOpen(true);
          }
        }}
        onBlur={close}
      >
        {children}
      </ChakraTooltip.Trigger>
      <Portal>
        <ChakraTooltip.Positioner>
          <ChakraTooltip.Content
            dir={i18n.dir()}
            maxW="min(320px, calc(100vw - 32px))"
            overflowWrap="anywhere"
            rounded="control"
            bg="bg.panel"
            color="fg"
            borderWidth="1px"
            borderColor="border"
            boxShadow="lg"
            px="3"
            py="2"
            fontSize="xs"
            fontWeight="500"
            lineHeight="1.7"
            textAlign="start"
          >
            {content}
          </ChakraTooltip.Content>
        </ChakraTooltip.Positioner>
      </Portal>
    </ChakraTooltip.Root>
  );
}
