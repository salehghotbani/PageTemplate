import type { ButtonProps } from '@chakra-ui/react';
import { IconButton as ChakraIconButton } from '@chakra-ui/react';
import * as React from 'react';
import { X } from 'lucide-react';
import i18n from '@/i18n';

export type CloseButtonProps = ButtonProps;

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(function CloseButton(props, ref) {
  return (
    <ChakraIconButton
      variant="ghost"
      aria-label={i18n.t('common.close')}
      ref={ref}
      {...props}
    >
      {props.children ?? <X />}
    </ChakraIconButton>
  );
});
