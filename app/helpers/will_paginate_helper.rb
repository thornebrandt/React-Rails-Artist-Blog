require 'will_paginate/view_helpers/link_renderer'
require 'will_paginate/view_helpers/action_view'

module WillPaginateHelper
  class BlogLinkRenderer < WillPaginate::ActionView::LinkRenderer
    protected
    def link(text, target, attributes = {})
      if target.is_a? Fixnum
        attributes[:rel] = ""
        target = "/blog/page/#{target}"
        attributes[:href] = target
        tag(:a, text, attributes)
      end
    end
  end

  class TagLinkRenderer < WillPaginate::ActionView::LinkRenderer
    def prepare(collection, options, template)
          @tag = options[:tag]
          super(collection, options, template)
        end

    protected

    def link(text, target, attributes = {})
      if target.is_a? Fixnum
        attributes[:rel] = ""
        target = "/tag/#{@tag}/#{target}"
        attributes[:href] = target
        tag(:a, text, attributes)
      end
    end
  end
end