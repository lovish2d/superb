import type { Meta, StoryObj } from '@storybook/react';
import Login from './index';

type LoginFormData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

const meta: Meta = {
  title: 'Pages/Public/Login',
  component: Login,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: async (data: LoginFormData) => {
      console.log('Login data:', data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    onSubmit: async (data: LoginFormData) => {
      console.log('Login data:', data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    onSubmit: async (data: LoginFormData) => {
      console.log('Login data:', data);
      throw new Error('Invalid credentials');
    },
    isLoading: false,
  },
};

