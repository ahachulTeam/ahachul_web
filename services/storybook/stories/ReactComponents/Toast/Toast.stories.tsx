import '@ahhachul/react-components-toast/style.css';
import '@ahhachul/react-components-button/style.css';
import { Button } from '@ahhachul/react-components-button';
import { ToastProvider, useToast } from '@ahhachul/react-components-toast';

export default {
  title: 'React Components/Toast',
  parameters: {
    layout: 'centered',
  },
};

const Example = () => {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          payload: {
            message: 'Hello, World!',
          },
        })
      }
    >
      Toast Button
    </Button>
  );
};

export const ToastStory = {
  render: () => (
    <ToastProvider>
      <Example />
    </ToastProvider>
  ),
};
