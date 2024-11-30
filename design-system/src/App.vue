<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-14 items-center">
        <div class="mr-4 flex">
          <a class="mr-6 flex items-center space-x-2" href="/">
            <span class="font-bold">Design System</span>
          </a>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container py-10">
      <!-- Hero Section -->
      <section class="mx-auto flex max-w-[980px] flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Component Library
        </h1>
        <p class="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
          Accessible and customizable components built with Vue 3 and Tailwind CSS.
        </p>
      </section>

      <!-- Categories Grid -->
      <div class="grid gap-8">
        <section>
          <h2 class="text-2xl font-bold tracking-tight">Atoms</h2>
          <p class="text-muted-foreground">Basic building blocks of the design system.</p>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Button</CardTitle>
                <CardDescription>Available variants: Default, Secondary, Destructive, Ghost</CardDescription>
              </CardHeader>
              <CardContent class="flex-1">
                <div class="flex gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Input</CardTitle>
                <CardDescription>Available variants: Text, Password, Search</CardDescription>
              </CardHeader>
              <CardContent class="flex-1">
                <div class="flex flex-col gap-2">
                  <Input type="text" placeholder="Text input" />
                  <Input type="password" placeholder="Password input" />
                  <Input type="search" placeholder="Search..." />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Textarea</CardTitle>
                <CardDescription>Available variants: Default, Disabled</CardDescription>
              </CardHeader>
              <CardContent class="flex-1">
                <div class="flex flex-col gap-2">
                  <Textarea placeholder="Type your message here." />
                  <Textarea disabled placeholder="Disabled textarea" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Label</CardTitle>
                <CardDescription>Available variants: Default</CardDescription>
              </CardHeader>
              <CardContent class="flex-1">
                <div class="flex flex-col gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        <section>
          <h2 class="text-2xl font-bold tracking-tight">Molecules</h2>
          <p class="text-muted-foreground">Groups of atoms that work together to create a more complex component.</p>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <!-- Add molecules here -->
          </div>
        </section>
        <section>
          <h2 class="text-2xl font-bold tracking-tight">Organisms</h2>
          <p class="text-muted-foreground">Groups of molecules that work together to create a more complex component.</p>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <!-- Add organisms here -->
          </div>
        </section>
        <section>
          <h2 class="text-2xl font-bold tracking-tight">Templates</h2>
          <p class="text-muted-foreground">Pre-defined layouts that can be used to create pages.</p>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <!-- Add templates here -->
          </div>
        </section>
        <section>
          <h2 class="text-2xl font-bold tracking-tight">Pages</h2>
          <p class="text-muted-foreground">The final output of the design system, created by combining templates and components.</p>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <!-- Add pages here -->
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from './components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Textarea } from './components/ui/textarea'

const categories = ref([
  {
    name: 'Inputs & Controls',
    description: 'Basic form controls and input elements',
    components: [
      {
        name: 'Button',
        variants: ['Default', 'Secondary', 'Destructive', 'Ghost'],
        template: `
          <div class="flex gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        `
      },
      {
        name: 'Input',
        variants: ['Text', 'Password', 'Search'],
        template: `
          <div class="flex flex-col gap-2">
            <Input type="text" placeholder="Text input" />
            <Input type="password" placeholder="Password input" />
            <Input type="search" placeholder="Search..." />
          </div>
        `
      },
      {
        name: 'Textarea',
        variants: ['Default', 'Disabled'],
        template: `
          <div class="flex flex-col gap-2">
            <Textarea placeholder="Type your message here." />
            <Textarea disabled placeholder="Disabled textarea" />
          </div>
        `
      },
      {
        name: 'Label',
        variants: ['Default'],
        template: `
          <div class="flex flex-col gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
        `
      }
    ]
  }
])
</script>

<style>
.container {
  @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
}
</style>
