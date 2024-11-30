<script setup lang="ts">
import { Button } from './src/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './src/components/ui/card'
import { MainLayout, DashboardLayout, GridLayout, SplitLayout, MasonryLayout } from '../design-system/src/layouts'
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Layout Examples Section -->
    <section class="p-8">
      <h1 class="mb-8 text-4xl font-bold">Layout Examples</h1>

      <!-- Dashboard Layout Example -->
      <div class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold">Dashboard Layout</h2>
        <Card class="h-[600px]">
          <DashboardLayout>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium">Dashboard Header</h3>
                <Button>Action</Button>
              </div>
            </template>

            <template #sidebar>
              <div class="space-y-4">
                <h4 class="font-medium">Navigation</h4>
                <nav class="space-y-2">
                  <a href="#" class="block text-muted-foreground hover:text-foreground">Dashboard</a>
                  <a href="#" class="block text-muted-foreground hover:text-foreground">Analytics</a>
                  <a href="#" class="block text-muted-foreground hover:text-foreground">Reports</a>
                </nav>
              </div>
            </template>

            <GridLayout cols="3" gap="4">
              <Card>
                <CardHeader>
                  <CardTitle>Card 1</CardTitle>
                  <CardDescription>Description</CardDescription>
                </CardHeader>
                <CardContent>Content</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Card 2</CardTitle>
                  <CardDescription>Description</CardDescription>
                </CardHeader>
                <CardContent>Content</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Card 3</CardTitle>
                  <CardDescription>Description</CardDescription>
                </CardHeader>
                <CardContent>Content</CardContent>
              </Card>
            </GridLayout>
          </DashboardLayout>
        </Card>
      </div>

      <!-- Split Layout Example -->
      <div class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold">Split Layout</h2>
        <Card class="h-[400px]">
          <SplitLayout split="1/3">
            <template #first>
              <div class="flex h-full items-center justify-center bg-muted/40">
                <div class="text-center">
                  <h3 class="text-lg font-medium">Left Panel</h3>
                  <p class="text-sm text-muted-foreground">1/3 width</p>
                </div>
              </div>
            </template>

            <template #second>
              <div class="flex h-full items-center justify-center">
                <div class="text-center">
                  <h3 class="text-lg font-medium">Right Panel</h3>
                  <p class="text-sm text-muted-foreground">2/3 width</p>
                </div>
              </div>
            </template>
          </SplitLayout>
        </Card>
      </div>

      <!-- Grid Layout Example -->
      <div class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold">Grid Layout</h2>
        <Card class="p-6">
          <GridLayout cols="4" gap="4">
            <Card>
              <CardHeader>
                <CardTitle>Grid Item 1</CardTitle>
              </CardHeader>
              <CardContent>Content</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Grid Item 2</CardTitle>
              </CardHeader>
              <CardContent>Content</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Grid Item 3</CardTitle>
              </CardHeader>
              <CardContent>Content</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Grid Item 4</CardTitle>
              </CardHeader>
              <CardContent>Content</CardContent>
            </Card>
          </GridLayout>
        </Card>
      </div>

      <!-- Masonry Layout Example -->
      <div>
        <h2 class="mb-4 text-2xl font-semibold">Masonry Layout</h2>
        <Card class="p-6">
          <MasonryLayout columns="4" gap="4">
            <Card class="mb-4 break-inside-avoid">
              <CardHeader>
                <CardTitle>Masonry Item 1</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="h-48 bg-muted"></div>
              </CardContent>
            </Card>
            <Card class="mb-4 break-inside-avoid">
              <CardHeader>
                <CardTitle>Masonry Item 2</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="h-64 bg-muted"></div>
              </CardContent>
            </Card>
            <Card class="mb-4 break-inside-avoid">
              <CardHeader>
                <CardTitle>Masonry Item 3</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="h-32 bg-muted"></div>
              </CardContent>
            </Card>
            <Card class="mb-4 break-inside-avoid">
              <CardHeader>
                <CardTitle>Masonry Item 4</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="h-56 bg-muted"></div>
              </CardContent>
            </Card>
            <Card class="mb-4 break-inside-avoid">
              <CardHeader>
                <CardTitle>Masonry Item 5</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="h-40 bg-muted"></div>
              </CardContent>
            </Card>
          </MasonryLayout>
        </Card>
      </div>
    </section>
  </div>
</template> 