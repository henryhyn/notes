<template lang='pug'>
  main.page
    slot(name='top')
    Content.theme-default-content
    footer.page-edit
      .edit-link
        Badge(vertical='middle' v-for='tag in $page.frontmatter.tags' :key='tag' :text='tag')
      .last-updated
        span.prefix 贡献者:
        span.time  {{ $page.git.contributors.join(', ') }}
    PageEdit
    PageNav(v-bind='{ sidebarItems }')
    slot(name='bottom')
</template>

<script>
  import PageEdit from '@vuepress/theme-default/components/PageEdit';
  import PageNav from '@vuepress/theme-default/components/PageNav';

  export default {
    components: { PageEdit, PageNav },
    props: ['sidebarItems']
  };
</script>
