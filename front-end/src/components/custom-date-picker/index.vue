<template>
  <div>
    <el-date-picker
      v-model="dateList"
      :type="type"
      @change="handleChange"
      :default-time="defaultTime"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    start: String,
    end: String,
    type: {
      type: String,
      default: "daterange"
    },
    defaultTime: {
      type: Array,
      default: () => ["00:00:00", "23:59:00"]
    }
  },
  data () {
    return {
      dateList: [ this.start, this.end ]
    };
  },
  methods: {
    handleChange (value) {
      if (!value) {
        this.$emit("update:start", undefined);
        this.$emit("update:end", undefined);
      } else {
        this.$emit("update:start", value[0].toString());
        this.$emit("update:end", value[1].toString());
      }
    }
  }
};
</script>
