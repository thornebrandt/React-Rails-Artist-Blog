# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170529025243) do

  create_table "portfolios", force: :cascade do |t|
    t.string   "name"
    t.string   "url"
    t.datetime "publish_date"
    t.boolean  "published"
    t.text     "icon"
    t.text     "body"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "posts", force: :cascade do |t|
    t.text     "title"
    t.string   "url"
    t.string   "post_type"
    t.text     "subtitle"
    t.text     "body"
    t.text     "summary"
    t.text     "icon"
    t.boolean  "published"
    t.integer  "portfolio_id"
    t.datetime "publish_date"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["portfolio_id"], name: "index_posts_on_portfolio_id"
  end

  create_table "posts_tags", force: :cascade do |t|
    t.integer "post_id"
    t.integer "tag_id"
    t.index ["post_id"], name: "index_posts_tags_on_post_id"
    t.index ["tag_id"], name: "index_posts_tags_on_tag_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.string   "color"
    t.text     "icon"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

end
