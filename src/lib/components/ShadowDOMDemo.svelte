<script lang="ts">
  import { Shield, Check, AlertCircle, Coffee, Heart } from '@lucide/svelte';
  import Icon from './Icon.svelte';
  import Button from './ui/Button.svelte';
  import Card from './ui/Card.svelte';
  import Alert from './ui/Alert.svelte';
  import Badge from './ui/Badge.svelte';

  let count = $state(0);

  function increment() {
    count++;
  }

  function decrement() {
    count--;
  }
</script>

<div class="p-6 space-y-6" data-theme="dracula">
  <!-- Header -->
  <div class="flex items-center gap-3">
    <Icon icon={Shield} size={32} class="text-primary" />
    <div>
      <h1 class="text-3xl font-bold">Shadow DOM Isolation Demo</h1>
      <p class="text-base-content/70">
        Testing CSS isolation with Lucide icons inside shadow root
      </p>
    </div>
  </div>

  <!-- Status Alert -->
  <Alert variant="success" showIcon={true}>
    {#snippet title()}
      Shadow DOM Active
    {/snippet}
    {#snippet children()}
      All styles (Tailwind, DaisyUI, Lucide icons) are properly isolated and working!
    {/snippet}
  </Alert>

  <!-- Counter Demo -->
  <Card title="Interactive Counter" bordered={true}>
    {#snippet children()}
      <div class="space-y-4">
        <div class="text-center">
          <div class="text-6xl font-bold text-primary">{count}</div>
          <p class="text-base-content/60 mt-2">Current Count</p>
        </div>

        <div class="flex gap-2 justify-center">
          <Button variant="error" size="lg" onclick={decrement}>
            Decrement
          </Button>
          <Button variant="primary" size="lg" onclick={increment}>
            Increment
          </Button>
        </div>
      </div>
    {/snippet}
  </Card>

  <!-- Icon Showcase -->
  <Card title="Lucide Icons Test" bordered={true}>
    {#snippet children()}
      <div class="flex flex-wrap gap-4 justify-center p-4">
        <div class="flex flex-col items-center gap-2">
          <Icon icon={Shield} size={48} class="text-info" />
          <Badge variant="info">Shield</Badge>
        </div>

        <div class="flex flex-col items-center gap-2">
          <Icon icon={Check} size={48} class="text-success" />
          <Badge variant="success">Check</Badge>
        </div>

        <div class="flex flex-col items-center gap-2">
          <Icon icon={AlertCircle} size={48} class="text-warning" />
          <Badge variant="warning">Alert</Badge>
        </div>

        <div class="flex flex-col items-center gap-2">
          <Icon icon={Coffee} size={48} class="text-accent" />
          <Badge variant="accent">Coffee</Badge>
        </div>

        <div class="flex flex-col items-center gap-2">
          <Icon icon={Heart} size={48} class="text-error" />
          <Badge variant="error">Heart</Badge>
        </div>
      </div>

      <div class="divider">Direct Lucide Components</div>

      <div class="flex flex-wrap gap-4 justify-center p-4">
        <Shield size={40} class="text-primary" />
        <Check size={40} class="text-success" />
        <AlertCircle size={40} class="text-warning" />
        <Coffee size={40} class="text-accent" />
        <Heart size={40} class="text-error" />
      </div>
    {/snippet}
  </Card>

  <!-- Component Gallery -->
  <Card title="Component Gallery" bordered={true}>
    {#snippet children()}
      <div class="space-y-4">
        <div class="flex gap-2 flex-wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="error">Error</Button>
        </div>

        <div class="flex gap-2 flex-wrap">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>

        <Alert variant="info" showIcon={true}>
          {#snippet title()}
            Information
          {/snippet}
          {#snippet children()}
            This is an info alert with an icon inside shadow DOM!
          {/snippet}
        </Alert>
      </div>
    {/snippet}
  </Card>

  <!-- Technical Details -->
  <Card title="Technical Details" bordered={true}>
    {#snippet children()}
      <ul class="list-disc list-inside space-y-2 text-base-content/80">
        <li>Shadow DOM mode: <code class="bg-base-200 px-2 py-1 rounded">open</code></li>
        <li>CSS isolation: <Badge variant="success">Active</Badge></li>
        <li>Tailwind utilities: <Badge variant="success">Working</Badge></li>
        <li>DaisyUI components: <Badge variant="success">Working</Badge></li>
        <li>Lucide icons: <Badge variant="success">Rendering</Badge></li>
        <li>Event handlers: <Badge variant="success">Functional</Badge></li>
        <li>Svelte reactivity: <Badge variant="success">Active</Badge></li>
      </ul>
    {/snippet}
  </Card>
</div>
